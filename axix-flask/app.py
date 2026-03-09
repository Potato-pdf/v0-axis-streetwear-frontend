from flask import Flask, render_template

app = Flask(__name__)

# Mock Blueprints for testing purposes
from flask import Blueprint

catalog_bp = Blueprint('catalog', __name__)
checkout_bp = Blueprint('checkout', __name__)

@catalog_bp.route('/')
def index():
    return render_template('catalog/index.html')

@catalog_bp.route('/catalog')
def catalog_view():
    return render_template('catalog/catalog.html')

@checkout_bp.route('/checkout')
def checkout_view():
    return render_template('checkout/checkout.html')

app.register_blueprint(catalog_bp)
app.register_blueprint(checkout_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
