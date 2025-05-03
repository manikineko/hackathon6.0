import React from "react";

export default function DashboardContent() {
  return (
    <div className="container-fluid h-100">
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card glass-card shadow-sm p-4 h-100">
            <h5 className="card-title mb-2">Lorem Card 1</h5>
            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac lacus eget enim pretium varius.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card glass-card shadow-sm p-4 h-100">
            <h5 className="card-title mb-2">Lorem Card 2</h5>
            <p className="card-text">Curabitur facilisis, eros a posuere dictum, nulla nisl dictum enim, in dictum ipsum urna eu velit.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card glass-card shadow-sm p-4 h-100">
            <h5 className="card-title mb-2">Lorem Card 3</h5>
            <p className="card-text">Etiam id massa ac nulla cursus dictum. Suspendisse potenti. Praesent euismod, nisl vel tincidunt luctus.</p>
          </div>
        </div>
      </div>
      <div className="card glass-card shadow-sm p-4">
        <h5 className="mb-3">Recent Activity</h5>
        <div className="table-responsive">
          <table className="table table-borderless align-middle mb-0">
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th scope="col">#</th>
                <th scope="col">Action</th>
                <th scope="col">Details</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td><i className="bi bi-airplane"></i> Flight Search</td>
                <td>Lorem ipsum dolor sit amet, consectetur.</td>
                <td>2025-05-02</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td><i className="bi bi-journal-bookmark"></i> Booking</td>
                <td>Nulla nisl dictum enim, in dictum ipsum urna.</td>
                <td>2025-05-01</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td><i className="bi bi-gear"></i> Settings Update</td>
                <td>Curabitur facilisis, eros a posuere dictum.</td>
                <td>2025-04-30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
