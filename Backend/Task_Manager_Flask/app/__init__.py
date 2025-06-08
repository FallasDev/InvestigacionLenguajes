from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)

    CORS(app)

    from app.controllers.tarea_controller import tarea_bp
    from app.controllers.usuario_controller import usuario_bp

    app.register_blueprint(tarea_bp)
    app.register_blueprint(usuario_bp)

    return app
