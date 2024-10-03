CREATE TABLE public.jobcount_history (
    id SERIAL PRIMARY KEY,
    jobname TEXT NOT NULL,
    count INTEGER NOT NULL,
    collected_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    error TEXT
);

INSERT INTO public.jobcount_history (jobname, count) VALUES
('Full Stack Developer', 10),
('Backend Developer', 5),
('Frontend Developer', 8),
('Data Scientist', 12),
('DevOps Engineer', 7);