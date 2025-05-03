@echo off
REM === SCP Upload Script for manikineko.nl site ===
REM Edit the following variables for your server
set SERVER_USER=root
set SERVER_HOST=mail.manikineko.nl
set SERVER_PATH=/var/www/manikineko

REM Upload all files recursively from current directory to remote server
REM -r: recursive, -C: compression, -i: for keyfile (optional)
REM Uncomment and edit the -i line if you use a keyfile

REM set KEYFILE=path\to\your\private_key
REM scp -i "%KEYFILE%" -r * %SERVER_USER%@%SERVER_HOST%:%SERVER_PATH%

scp -r * %SERVER_USER%@%SERVER_HOST%:%SERVER_PATH%

REM Display completion message
if %errorlevel%==0 (
    echo Upload completed successfully.
) else (
    echo Upload failed!
)
pause
