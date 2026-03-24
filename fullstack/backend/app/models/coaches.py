from backend.app.extensions import db

class Coaches(db.Model):
    __tablename__ = 'coaches'
    
    id = db.Column('id', db.String(20), primary_key=True)    
    name = db.Column('name', db.String(150))

    athlete_participation = db.relationship('AthleteParticipations', back_populates="coach", cascade="all, delete")
    
    def __init__(self, id, name):
            self.id = id
            self.name = name

    def __repr__(self):
        return f'\nid: {self.id}, ФИО: {self.name}'
    