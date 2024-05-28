from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.config.from_object('config.Config')

@app.route('/', methods=['GET', 'POST'])
def handle_form():
    if request.method == 'POST':
        name = request.form.get('name')
        password = request.form.get('password')
        # Zde můžete přidat další logiku pro zpracování dat, například ověření uživatele
        flash(f'Přihlášen jako {name}', 'success')
        return redirect(url_for('handle_form'))
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
