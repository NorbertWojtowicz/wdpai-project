--
-- PostgreSQL database dump
--

\restrict VuSxGl3Z90rQzcwVK8Og2kzaGsrAbFzUIaQIFrQqetjWHg8GWnQJHGymehkV0Np

-- Dumped from database version 17.6 (Debian 17.6-1.pgdg13+1)
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: catches; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.catches (
    id integer NOT NULL,
    user_id integer,
    spot_id integer,
    fish_name character varying(100),
    weight_kg numeric(5,2),
    caught_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.catches OWNER TO docker;

--
-- Name: catches_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.catches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.catches_id_seq OWNER TO docker;

--
-- Name: catches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.catches_id_seq OWNED BY public.catches.id;


--
-- Name: spots; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.spots (
    id integer NOT NULL,
    user_id integer,
    name character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.spots OWNER TO docker;

--
-- Name: spots_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.spots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.spots_id_seq OWNER TO docker;

--
-- Name: spots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.spots_id_seq OWNED BY public.spots.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: docker
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password text NOT NULL,
    role character varying(10) DEFAULT 'user'::character varying NOT NULL
);


ALTER TABLE public.users OWNER TO docker;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: docker
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO docker;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docker
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: catches id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.catches ALTER COLUMN id SET DEFAULT nextval('public.catches_id_seq'::regclass);


--
-- Name: spots id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.spots ALTER COLUMN id SET DEFAULT nextval('public.spots_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: catches; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.catches (id, user_id, spot_id, fish_name, weight_kg, caught_at) FROM stdin;
1	1	1	Pstrąg	1.10	2025-09-12 17:43:52.109774
2	1	1	Pstrąg	1.30	2025-09-12 17:43:57.410653
3	1	1	Pstrąg	2.20	2025-09-12 17:44:04.600296
4	1	1	Pstrąg	5.00	2025-09-12 17:44:09.01375
5	1	1	Okoń	0.40	2025-09-12 17:44:18.739107
6	1	1	Okoń	0.40	2025-09-12 17:44:20.891459
7	1	1	Okoń	0.60	2025-09-12 17:44:27.730192
8	1	1	ah	5.00	2025-09-13 04:52:21.868189
9	2	4	Pstrąg	1.10	2025-09-13 07:02:02.829494
10	2	4	Pstrąg	2.00	2025-09-13 07:02:07.653094
11	2	4	Okoń	0.50	2025-09-13 07:02:15.886678
12	2	4	Okoń	0.30	2025-09-13 07:02:19.18878
13	2	4	Ukleja	0.35	2025-09-13 07:02:36.167508
14	2	7	Karp	4.00	2025-09-13 07:02:49.746344
15	2	7	Karp	3.40	2025-09-13 07:02:54.394568
16	2	7	Karp	5.57	2025-09-13 07:02:59.158557
17	2	6	Szczupak	3.24	2025-09-13 07:03:19.454368
18	2	6	Szczupak	1.50	2025-09-13 07:03:27.983
19	2	6	Pstrąg	2.00	2025-09-13 07:03:33.539337
20	2	5	Okoń	0.50	2025-09-13 07:03:54.644127
\.


--
-- Data for Name: spots; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.spots (id, user_id, name, city, country, created_at) FROM stdin;
2	1	Wisła	Warszawa	Polska	2025-09-12 19:15:42.670981
3	1	test	test	test	2025-09-13 03:36:09.600374
4	2	San	Sanok	Polska	2025-09-13 06:59:46.833248
5	2	Wisła	Warszawa	Polska	2025-09-13 06:59:53.70124
6	2	Odra	Wrocław	Polska	2025-09-13 07:01:07.087186
7	2	Dunajec	Pieniny	Polska	2025-09-13 07:01:36.986428
1	1	Stawy PZW	Sanok	Polska	2025-09-12 17:29:42.425325
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: docker
--

COPY public.users (id, username, password, role) FROM stdin;
2	Norbert	$2y$10$6OIQ0BM5l.qLZEnoYFfdHe06PL3crAqR2F.5u8cqevAiJH9xs1LHO	user
1	Tomasz	$2y$10$1i/ws4gCSxAAhG1PAEjwD.alwZMs7.vDl/woCsZ0VUMlaQyPNJBs2	user
\.


--
-- Name: catches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.catches_id_seq', 20, true);


--
-- Name: spots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.spots_id_seq', 7, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docker
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: catches catches_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.catches
    ADD CONSTRAINT catches_pkey PRIMARY KEY (id);


--
-- Name: spots spots_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.spots
    ADD CONSTRAINT spots_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: catches catches_spot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.catches
    ADD CONSTRAINT catches_spot_id_fkey FOREIGN KEY (spot_id) REFERENCES public.spots(id) ON DELETE SET NULL;


--
-- Name: catches catches_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.catches
    ADD CONSTRAINT catches_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: spots spots_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docker
--

ALTER TABLE ONLY public.spots
    ADD CONSTRAINT spots_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict VuSxGl3Z90rQzcwVK8Og2kzaGsrAbFzUIaQIFrQqetjWHg8GWnQJHGymehkV0Np

