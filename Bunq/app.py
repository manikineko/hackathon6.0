# app.py

import logging
from bunq.sdk.context.api_context import ApiContext
from bunq.sdk.context.bunq_context import BunqContext
import bunq.sdk.model.generated.endpoint as endpoint
from config import API_CONTEXT_FILE

# ———————————————
# Logging & Initialization
# ———————————————
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load your Bunq API context (sandbox or prod)
api_context = ApiContext.restore(API_CONTEXT_FILE)
api_context.ensure_session_active()
BunqContext.load_api_context(api_context)


# ———————————————
# Runtime discovery of endpoint classes
# ———————————————
def find_cls(prefix: str):
    candidates = [n for n in dir(endpoint) if n.startswith(prefix)]
    if not candidates:
        raise RuntimeError(f"No endpoint class starts with '{prefix}'!")
    cls_name = candidates[0]
    logger.info(f"→ Using {prefix} class: {cls_name}")
    return getattr(endpoint, cls_name)

SavingsCls = find_cls("MonetaryAccountSavings")
BankCls    = find_cls("MonetaryAccountBank")
PaymentCls = find_cls("Payment")

# ———————————————
# Core functions
# ———————————————

def ensure_travel_pot(target_balance: float = 500.0):
    """
    1. Find your main bank account.
    2. Find or create a savings pot.
    3. Transfer exactly the amount needed so the pot has `target_balance`.
    Returns the pot object.
    """
    # 1. Main bank account
    banks = BankCls.list().value
    if not banks:
        raise RuntimeError("No MonetaryAccountBank found!")
    bank = banks[0]
    bank_id = bank.id_
    bank_balance = float(bank.balance.value)
    logger.info(f"Main account #{bank_id} has {bank_balance:.2f} EUR")

    # 2. Find or create savings pot
    pots = SavingsCls.list().value
    if pots:
        pot = pots[0]
        logger.info(f"Found pot #{pot.id_} with {pot.balance.value} {pot.balance.currency}")
    else:
        logger.info("No pot found — creating one now…")
        resp = SavingsCls.post(
            monetary_account_savings={
                "currency": "EUR",
                "description": "Travel Pot"
            }
        )
        pot = resp.value[0]
        logger.info(f"Created pot #{pot.id_} (balance {pot.balance.value} EUR)")

    # 3. Top up to reach target_balance
    current = float(pot.balance.value)
    if current >= target_balance:
        logger.info(f"Pot already has ≥{target_balance:.2f} EUR; no transfer needed.")
    else:
        needed = target_balance - current
        if bank_balance < needed:
            raise RuntimeError(f"Insufficient funds in main account ({bank_balance:.2f} EUR) to top up {needed:.2f} EUR.")
        logger.info(f"Transferring {needed:.2f} EUR into pot #{pot.id_}…")
        PaymentCls.create(
            amount={"value": f"{needed:.2f}", "currency": "EUR"},
            counterparty_alias=pot.alias[0],
            description="Top-up Travel Pot",
            monetary_account_id=bank_id
        )
        logger.info("Transfer complete.")

        # Refresh pot object so it has updated balance
        pot = [p for p in SavingsCls.list().value if p.id_ == pot.id_][0]
        logger.info(f"New pot balance: {pot.balance.value} {pot.balance.currency}")

    return pot

from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/budget')
def get_budget():
    # Get the main Bunq account's balance
    banks = BankCls.list().value
    if not banks:
        return jsonify({"error": "No MonetaryAccountBank found!"}), 500
    bank = banks[0]
    balance = float(bank.balance.value)
    currency = bank.balance.currency
    return jsonify({"budget": balance, "currency": currency})

def serialize_bunq_obj(obj):
    # Recursively serialize SDK objects, lists, and primitives
    if hasattr(obj, '__dict__'):
        return {k: serialize_bunq_obj(v) for k, v in obj.__dict__.items() if not k.startswith('_')}
    if isinstance(obj, list):
        return [serialize_bunq_obj(item) for item in obj]
    if isinstance(obj, (str, int, float, bool, type(None))):
        return obj
    return str(obj)

@app.route('/api/bunq/raw', methods=['POST'])
def bunq_raw():
    """
    Modular raw proxy for Bunq SDK.
    Expects JSON body: { "endpoint": "Payment", "method": "list", "args": {...} }
    Uses find_cls() helper to get correct class.
    Returns raw SDK response or error.
    """
    data = request.get_json(force=True)
    logger.info(f"[bunq_raw] Incoming request: {data}")
    endpoint_name = data.get('endpoint')
    method_name = data.get('method')
    args = data.get('args', {})

    if not endpoint_name or not method_name:
        logger.error("[bunq_raw] Missing endpoint or method in request.")
        return jsonify({"error": "Missing endpoint or method"}), 400

    try:
        # Use find_cls helper to get the right class (handles e.g. "Payment" → "PaymentApiObject")
        try:
            cls = find_cls(endpoint_name)
            logger.info(f"[bunq_raw] Resolved endpoint class: {cls.__name__}")
        except Exception as e:
            logger.error(f"[bunq_raw] Endpoint '{endpoint_name}' not found: {e}")
            return jsonify({"error": f"Endpoint '{endpoint_name}' not found: {e}"}), 400

        if not hasattr(cls, method_name):
            logger.error(f"[bunq_raw] Method '{method_name}' not found on endpoint '{cls.__name__}'")
            return jsonify({"error": f"Method '{method_name}' not found on endpoint '{cls.__name__}'"}), 400

        logger.info(f"[bunq_raw] Calling {cls.__name__}.{method_name} with args: {args}")
        method = getattr(cls, method_name)
        result = method(**args)
        # Try to serialize result
        try:
            out = result.value if hasattr(result, 'value') else result
            out = serialize_bunq_obj(out)
        except Exception as ser_err:
            logger.error(f"[bunq_raw] Error serializing result: {ser_err}")
            out = str(result)
        logger.info(f"[bunq_raw] Success. Returning result.")
        return jsonify({"result": out})
    except Exception as e:
        logger.error(f"[bunq_raw] Exception: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=8000)
