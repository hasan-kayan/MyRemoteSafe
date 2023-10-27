import socket
import http.server
import socketserver

# Define the host and port for your server
host = '0.0.0.0'  # localhost
port = 8000

# Define the HTML file to serve as the default page
html_file = 'index.html'  # Rename your HTML file to 'index.html'

# Create a server function to handle incoming connections
def start_server():
    Handler = http.server.SimpleHTTPRequestHandler
    Handler.extensions_map['.html'] = 'text/html'  # Add .html extension for proper MIME type
    httpd = socketserver.TCPServer((host, port), Handler)
    print(f"Serving HTML on {host}:{port} from {html_file}")

    httpd.serve_forever()

if __name__ == '__main__':
    start_server()
