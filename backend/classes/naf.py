from database import db

class Naf(db.Model):
    __tablename__ = "naf"

    id_naf = db.Column(db.Integer, primary_key=True)
    code_naf = db.Column(db.String(255))
    intitule_naf = db.Column(db.String(255))
    intitule_naf_65 = db.Column(db.String(255))
    intitule_naf_40 = db.Column(db.String(255))

    def __init__(self, code_naf, intitule_naf, intitule_naf_65, intitule_naf_40):

        self.code_naf = code_naf
        self.intitule_naf = intitule_naf
        self.intitule_naf_65 = intitule_naf_65
        self.intitule_naf_40 = intitule_naf_40
    
    def __repr__(self):
        return '%s/%s/%s/%s' % (self.code_naf, self.intitule_naf, self.intitule_naf_65, self.intitule_naf_40)

