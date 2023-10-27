from flask import Flask, request
import os 
import keyboard
import socket

def pc_shutdown():
    os.system("shutdown /s /t 1")

def pc_restart():
    os.system("shutdown /r /t 1")

def pc_logoff():
    os.system("shutdown /l /t 1")

def pc_sleep():
    os.system("rundll32.exe powrprof.dll,SetSuspendState 0,1,0")

# Lets create a function that run a gif file


def pc_gif():
    gif_path = 'path/to/your/gif/file.gif'
    os.system(f'start /min "{gif_path}"')



def listen_keyboard():
    while True:
        event = keyboard.read_event()
        print(event.name)

def get_ip_address():
    try:
        # Create a socket object and connect to an external service
        # (e.g., Google's DNS server) to determine the local IP address
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip_address = s.getsockname()[0]
        s.close()
        return ip_address
    except Exception as e:
        return str(e)
      

app = Flask(__name__)

# Create routes to trigger functions
@app.route('/call_function', methods=['GET'])
def call_function():
    function_name = request.args.get('name')

    if function_name == 'pc_shutdown':
        result = pc_shutdown()
    elif function_name == 'pc_restart':
       result = pc_restart()
    elif function_name == 'pc_restart':
       result = pc_restart()
    elif function_name == 'pc_logoff':
         result = pc_logoff()
    elif function_name == 'pc_sleep':
            result = pc_sleep()
    else:
        result = "Function not found"
    
    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)