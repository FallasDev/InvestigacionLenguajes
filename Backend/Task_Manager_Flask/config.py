import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:1234@localhost/task_manager"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

