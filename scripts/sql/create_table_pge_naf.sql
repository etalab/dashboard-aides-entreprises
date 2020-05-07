CREATE TABLE pgenaf
(
	id_pgenaf SERIAL PRIMARY KEY NOT NULL,
    reg CHARACTER VARYING,
    dep CHARACTER VARYING,
    code_section CHARACTER VARYING,
    nombre DECIMAL(9,2),
    montant DECIMAL(15,2),
    last_update date default NULL
)
TABLESPACE pg_default;