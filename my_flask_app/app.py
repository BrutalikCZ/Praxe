import mysql.connector
from flask import Flask, render_template, request, redirect, url_for, flash


mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Heslo123",
    database="pracovniTest"
)

app = Flask(__name__)
app.config.from_object('config.Config')

@app.route('/', methods=['GET', 'POST'])
def handle_form():
    if request.method == 'POST':
        name = request.form.get('name')
        password = request.form.get('password')
        
        cursor = mydb.cursor(dictionary=True)
        query = "SELECT * FROM user WHERE username = %s AND password = %s"
        cursor.execute(query, (name, password))
        user = cursor.fetchone()
        
        if user:
            # Pokud jsou přihlašovací údaje správné, přesměrujeme uživatele na jiný odkaz
            return redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        else:
            # Pokud jsou přihlašovací údaje špatné, zobrazíme chybu
            flash('Nesprávné přihlašovací údaje', 'error')
        
        cursor.close()
        
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
