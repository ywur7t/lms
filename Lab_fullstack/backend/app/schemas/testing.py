from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from marshmallow import fields
from ..models.quiz import Quiz
from ..models.task import Task


class TaskSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Task
        load_instance = True
        


class QuizSchema(SQLAlchemyAutoSchema):
    tasks = fields.Nested(TaskSchema, many=True)

    class Meta:
        model = Quiz
        load_instance = True
        include_relationships = True  