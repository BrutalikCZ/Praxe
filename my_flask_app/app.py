import mysql.connector
from flask import Flask, render_template, request, redirect, url_for, flash
import hashlib

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

        name2 = hashlib.sha256()
        name2.update(name.encode('utf-8')) 
        hashedName2 = name2.hexdigest()
        name = hashedName2

        password = request.form.get('password')
        password2 = hashlib.sha256()
        password2.update(password.encode('utf-8')) 
        hashedPassword2 = password2.hexdigest()
        password = hashedPassword2

        cursor = mydb.cursor(dictionary=True)
        
        query = "SELECT * FROM user WHERE username = %s AND password = %s"
        cursor.execute(query, (name, password))
        user = cursor.fetchone()
        
        if user:
            return redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGw%3D")
        else:
            flash('Nesprávné přihlašovací údaje', 'error')
        
        cursor.close()
        
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)