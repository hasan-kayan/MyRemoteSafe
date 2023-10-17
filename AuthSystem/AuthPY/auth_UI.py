from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def login():
    giris_basarili = False
    kullanici_adi = None

    if request.method == 'POST':
        kullanici_adi = request.form['kullanici_adi']
        sifre = request.form['sifre']

        # Kullanıcı adı ve şifre kontrolü yapabilirsiniz
        if kullanici_adi == 'kullanici' and sifre == 'parola':
            giris_basarili = True

    return render_template('login.html', giris_basarili=giris_basarili, kullanici_adi=kullanici_adi)

if __name__ == '__main__':
    app.run(debug=True)
