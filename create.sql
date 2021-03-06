CREATE TABLE usuario (
	id bigserial NOT NULL,
	nome varchar NULL,
	senha varchar NOT NULL,
	email varchar NOT NULL,
	created_at timestamp NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (id)
);

CREATE TABLE "time" (
	id bigserial NOT NULL,
	nome varchar NULL,
	descricao varchar NULL,
	idresponsavel bigserial NOT NULL,
	CONSTRAINT time_pk PRIMARY KEY (id),
	CONSTRAINT time_fk FOREIGN KEY (idresponsavel) REFERENCES usuario(id)
);

CREATE TABLE usuariotime (
	id bigserial NOT NULL,
	idusuario bigserial NOT NULL,
	idtime bigserial NOT NULL,
	created_at timestamp NULL,
	CONSTRAINT usuariotime_un UNIQUE (idusuario, idtime),
	CONSTRAINT usuariotime_fk FOREIGN KEY (idusuario) REFERENCES usuario(id),
	CONSTRAINT usuariotime_fk_1 FOREIGN KEY (idtime) REFERENCES "time"(id)
);


CREATE TABLE convite (
	id bigserial NOT NULL,
	idusuario bigserial NOT NULL,
	idtime bigserial NOT NULL,
	stativo bool NULL,
	created_at timestamp NULL,
	CONSTRAINT convite_pk PRIMARY KEY (id),
	CONSTRAINT convite_fk FOREIGN KEY (idusuario) REFERENCES usuario(id),
	CONSTRAINT convite_fk_1 FOREIGN KEY (idtime) REFERENCES "time"(id)
);

CREATE TABLE reuniao (
	id bigserial NOT NULL,
	idorganizador bigserial NOT NULL,
	datahora timestamp NULL,
	idtime bigserial NOT NULL,
	CONSTRAINT reuniao_pk PRIMARY KEY (id),
	CONSTRAINT reuniao_fk FOREIGN KEY (idorganizador) REFERENCES usuario(id),
	CONSTRAINT reuniao_fk_1 FOREIGN KEY (idtime) REFERENCES "time"(id)
);