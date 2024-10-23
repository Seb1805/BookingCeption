@echo off
REM Check if the virtual environment exists
if exist fastapiVenv (
    REM Delete existing virtual environment
    rmdir /s /q fastapiVenv
    echo Existing virtual environment deleted.
)

REM Create new virtual environment
python -m venv fastapiVenv

REM Activate the virtual environment
call fastapiVenv\Scripts\activate.bat

REM Install packages from requirements.txt
pip install -r requirements.txt

REM Deactivate the virtual environment
deactivate

echo Virtual environment recreated and packages installed successfully!
pause
