class PomodoroSession :
    session_id_counter = 0  # Compteur pour attribuer des identifiants uniques

    def __init__(self, work_duration=25, short_break_duration=5, long_break_duration=15):
        PomodoroSession.session_id_counter += 1
        self.session_id = PomodoroSession.session_id_counter
        self.work_duration = work_duration
        self.short_break_duration = short_break_duration
        self.long_break_duration = long_break_duration
        self.is_working = False