from extensions import db

class AthleteParticipations(db.Model):

    __tablename__ = 'athlete_participations'

    id = db.Column('id', db.Integer(), primary_key=True)
    games_id = db.Column(db.Integer, db.ForeignKey("games.id"))
    athlete_id = db.Column(db.String(20), db.ForeignKey("athletes.id"))
    event_id = db.Column(db.String(20), db.ForeignKey("events.id"))
    coach_id = db.Column(db.String(20), db.ForeignKey("coaches.id"))
    medal_id = db.Column(db.Integer, db.ForeignKey("medals.id"))
    result_value = db.Column('result_value', db.Numeric(10, 3))
    result_unit = db.Column('result_unit', db.String(50))
    is_record_holder = db.Column('is_record_holder', db.String(20))
    notes  = db.Column('notes', db.Text())

    games = db.relationship('Games', back_populates="athlete_participation")
    athlete = db.relationship('Athletes', back_populates="athlete_participation")
    coach = db.relationship('Coaches', back_populates="athlete_participation")
    medal = db.relationship('Medals', back_populates="athlete_participation")
    event = db.relationship('Events', back_populates="athlete_participation")

    
    def __repr__(self):
        return f'\nid: {self.id}, ФИО: {self.athlete_id}, Пол: {self.games_id}, \
        Дата рождения: {self.event_id}, coach_id: {self.coach_id}, \
        medal_id: {self.medal_id}, result_value: {self.result_value}, \
        result_unit: {self.result_unit}, is_record_holder: {self.is_record_holder}, \
        notes: {self.notes}'