from flask import Flask
from .config import DevelopmentConfig
from .extensions import db
from .crud import create, read, update, delete
from .upload_db import country_upload, city_upload, building_upload
from .query import query

# Импортируем маршруты
from app.views import main

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)
    
    db.init_app(app)
    app.app_context().push()

    # create()
    # read()
    # update()
    # delete()
    # country_upload()
    # city_upload()
    # building_upload()
    query()

    with app.app_context():
        db.create_all()

    # Регистрация Blueprint-ов
    app.register_blueprint(main)

    return app