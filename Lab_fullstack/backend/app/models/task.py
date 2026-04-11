from ..extensions import db


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey("quizzes.id"))
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)