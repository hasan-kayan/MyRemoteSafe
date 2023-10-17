from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def login():
    login_success = False
    user_name = None

    if request.method == 'POST':
        user_name = request.form['kullanici_adi']
        password = request.form['sifre']

        # At this state we are just checking the strings, later we can use SHA256 encoding to check user information
        if user_name == 'Hasan' and user_name == 'Kayan':
            login_success = True

    return render_template('login.html', login_success=login_success, user_name=user_name)

if __name__ == '__main__':
    app.run(debug=True)
