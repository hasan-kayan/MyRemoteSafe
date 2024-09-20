import os_detector as od
import os
import subprocess

def install_node():
    os_name = od.detect_os()

    if os_name == "Windows":
        # Install Node.js via Chocolatey or direct download
        subprocess.run(["choco", "install", "nodejs"])
    elif os_name == "macOS":
        subprocess.run(["/bin/bash", "-c", "brew install node"])
    elif os_name == "Linux":
        # For Linux (Debian-based)
        subprocess.run(["curl", "-fsSL", "https://deb.nodesource.com/setup_18.x", "|", "sudo", "-E", "bash", "-"])
        subprocess.run(["sudo", "apt", "install", "-y", "nodejs"])
    else:
        print("Unsupported OS")

install_node()
