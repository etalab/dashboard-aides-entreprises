CREATE TABLE naf
(
	id_naf SERIAL PRIMARY KEY NOT NULL,
    code_sous_classe CHARACTER VARYING,
    libelle_sous_classe CHARACTER VARYING,
    code_sous_classe_short CHARACTER VARYING,
    code_classe CHARACTER VARYING,
    libelle_classe CHARACTER VARYING,
    code_classe_short CHARACTER VARYING,
    code_groupe CHARACTER VARYING,
    libelle_groupe CHARACTER VARYING,
    code_groupe_short CHARACTER VARYING,
    code_division CHARACTER VARYING,
    libelle_division CHARACTER VARYING,
    code_section CHARACTER VARYING,
    libelle_section CHARACTER VARYING,
    color_section CHARACTER VARYING
)
TABLESPACE pg_default;

