#!/usr/bin/env python3
import http.server
import socketserver
import json
import os
from urllib.parse import urlparse, parse_qs

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        # API endpoint để list files trong folder
        if parsed_path. path == '/api/list-files':
            params = parse_qs(parsed_path.query)
            folder = params.get('path', [''])[0]
            
            # Bảo mật: chỉ cho phép truy cập thư mục courses
            if not folder.startswith('courses/'):
                self.send_error(403, "Forbidden")
                return
            
            try:
                files = os.listdir(folder)
                # Lọc chỉ lấy file . md và .json
                files = [f for f in files if f.endswith(('.md', '.json'))]
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json. dumps(files).encode())
            except FileNotFoundError:
                self. send_error(404, "Folder not found")
            except Exception as e:
                self.send_error(500, str(e))
        
        # API endpoint để list courses
        elif parsed_path.path == '/api/list-courses':
            try: 
                courses = []
                courses_dir = 'courses'
                
                if os.path.exists(courses_dir):
                    for folder in os.listdir(courses_dir):
                        folder_path = os.path.join(courses_dir, folder)
                        if os.path.isdir(folder_path):
                            courses.append({
                                'name': folder. replace('-', ' ').title(),
                                'path': f'courses/{folder}',
                                'description': f'Course:  {folder}'
                            })
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(courses).encode())
            except Exception as e: 
                self.send_error(500, str(e))
        else:
            # Xử lý request file tĩnh bình thường
            super().do_GET()

PORT = 8080
with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    httpd.serve_forever()