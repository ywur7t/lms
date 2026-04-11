from ..extensions import db


class Quiz(db.Model):
    __tablename__ = "quizzes"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(1), nullable=False)
    title = db.Column(db.Text, nullable=False)

    tasks = db.relationship("Task", backref="quiz", lazy=True)