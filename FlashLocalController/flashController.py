import os 
import keyboard

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

      
