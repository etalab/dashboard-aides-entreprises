from database import db

class Classeeffectif(db.Model):
    __tablename__ = "classeeffectif"

    id_classe_effectif = db.Column(db.Integer, primary_key=True)
    denomination = db.Column(db.String(255))
    libelle = db.Column(db.String(255))
    libelle_long = db.Column(db.String(255))

    def __init__(self, denomination, libelle, libelle_long):

        self.denomination = denomination
        self.libelle = libelle
        self.libelle_long = libelle_long
    
    def __repr__(self):
        return '%s/%s/%s' % (self.denomination, self.libelle, self.libelle_long)

