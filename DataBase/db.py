import sqlite3

def create_db():
    conn = sqlite3.connect('config.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS config
                 (key TEXT PRIMARY KEY, value TEXT)''')
    conn.commit()
    conn.close()

def save_config(key, value):
    conn = sqlite3.connect('config.db')
    c = conn.cursor()
    c.execute('INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)', (key, value))
    conn.commit()
    conn.close()

create_db()
save_config('gitlab_account', 'hasankayan')
save_config('github_account', 'hasankayan123')
save_config('default_account', 'github')
