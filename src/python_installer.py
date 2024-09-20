import os
import subprocess
import os_detector as od

def install_python():
    os_name = od.detect_os()

    if os_name == "Windows":
        # For Windows, download and run Python installer
        subprocess.run(["powershell", "Start-Process", "https://www.python.org/ftp/python/3.9.7/python-3.9.7-amd64.exe", "-Wait"])
    elif os_name == "macOS":
        # For macOS, use Homebrew
        subprocess.run(["/bin/bash", "-c", "brew install python"])
    elif os_name == "Linux":
        # For Linux (Debian-based)
        subprocess.run(["sudo", "apt", "update"])
        subprocess.run(["sudo", "apt", "install", "-y", "python3"])
    else:
        print("Unsupported OS")

install_python()
