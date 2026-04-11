from flask import Blueprint, jsonify, request

from ..models.quiz import Quiz
from ..models.task import Task
from ..schemas.testing import QuizSchema
from ..models.buildings import Building
from ..extensions import db, auth
from ..schemas.building import buildings_cschema, building_cschema
from marshmallow import ValidationError

quiz_bp = Blueprint("quiz", __name__)

from sqlalchemy.orm import joinedload

@quiz_bp.route("/", methods=["GET"])
def get_quizzes():
    quizzes = Quiz.query.options(joinedload(Quiz.tasks)).all()

    return jsonify({
        "quizzes": QuizSchema(many=True).dump(quizzes)
    })

@quiz_bp.route("/", methods=["POST"])
def create_quiz():
    data = request.json

    quiz = Quiz(
        type=data["type"],
        title=data["title"]
    )

    db.session.add(quiz)
    db.session.flush()

    for t in data["tasks"]:
        task = Task(
            quiz_id=quiz.id,
            question=t["question"],
            answer=t["answer"]
        )
        db.session.add(task)

    db.session.commit()

    return jsonify({"success": True}), 201





@quiz_bp.route("/debug")
def debug():
    from ..models.task import Task
    tasks = Task.query.all()

    result = []
    for t in tasks:
        if t is None:
            result.append("NULL 💀")
        else:
            result.append({
                "id": t.id,
                "quiz_id": t.quiz_id,
                "q": t.question
            })

    return jsonify(result)