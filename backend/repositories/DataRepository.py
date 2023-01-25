from .Database import Database


class DataRepository:
    @staticmethod
    def json_or_formdata(request):
        if request.content_type == 'application/json':
            gegevens = request.get_json()
        else:
            gegevens = request.form.to_dict()
        return gegevens


    @staticmethod
    def read_all_data():
        sql = "SELECT * FROM spel"
        result = Database.get_rows(sql)
        return result

    @staticmethod
    def read_1vs1_data():
        sql = "SELECT * FROM spel"
        result = Database.get_rows(sql)
        return result

    @staticmethod
    def read_1vs1_data_by_time(time):
        sql = "SELECT idSpel, spelNaam, tijd, winnaar, count(winnaar) as 'score' FROM spel where spelNaam = '1VS1' and tijd = %s group by winnaar order by score desc"
        params = [time]
        result = Database.get_rows(sql, params)
        return result

    @staticmethod
    def read_simonsays_data_by_difficulty_and_start_buttons(difficulty, start_buttons):
        sql = "SELECT idSpel, spelNaam, naam1, winnaar, tijd, aantalPalen, moeilijkheidsgraad, score FROM spel where spelNaam = 'Simon Says' and moeilijkheidsgraad = %s and aantalPalen = %s order by score desc"
        params = [difficulty, start_buttons]
        result = Database.get_rows(sql, params)
        return result

    @staticmethod
    def read_speedrun_data_by_difficulty_and_buttons(difficulty, buttons):
        sql = "SELECT idSpel, spelNaam, naam1, winnaar, tijd AS 'score', aantalPalen, moeilijkheidsgraad FROM spel where spelNaam = 'Speedrun' and moeilijkheidsgraad = %s and aantalPalen = %s  order by tijd asc"
        params = [difficulty, buttons]
        result = Database.get_rows(sql, params)
        return result

    @staticmethod
    def read_shuttlerun_data_by_difficulty(difficulty):
        sql = "SELECT idSpel, spelNaam, naam1, winnaar, moeilijkheidsgraad, score FROM spel where spelNaam = 'Shuttle Run' and moeilijkheidsgraad = %s order by score desc"
        params = [difficulty]
        result = Database.get_rows(sql, params)
        return result
