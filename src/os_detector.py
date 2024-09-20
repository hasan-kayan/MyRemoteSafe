import platform

def detect_os():
    os_name = platform.system()
    if os_name == "Windows":
        print("Windows")
        return "Windows"
    elif os_name == "Darwin":
        print("macOS")
        return "macOS"
    elif os_name == "Linux":
        print("Linux")
        return "Linux"
    else:
        return "Unsupported OS"
    
if __name__ == "__main__":
    detect_os()