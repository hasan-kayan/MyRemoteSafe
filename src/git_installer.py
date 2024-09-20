import os_detector as od
import os
import subprocess
def install_git():
    os_name = od.detect_os()

    if os_name == "Windows":
        subprocess.run(["choco", "install", "git"])
    elif os_name == "macOS":
        subprocess.run(["/bin/bash", "-c", "brew install git"])
    elif os_name == "Linux":
        subprocess.run(["sudo", "apt", "install", "-y", "git"])
    else:
        print("Unsupported OS")

install_git()
