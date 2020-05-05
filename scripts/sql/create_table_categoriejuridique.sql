CREATE TABLE categoriejuridique
(
	id_categoriejuridique SERIAL PRIMARY KEY NOT NULL,
    code CHARACTER VARYING,
    libelle CHARACTER VARYING,
    color CHARACTER VARYING
)
TABLESPACE pg_default;

