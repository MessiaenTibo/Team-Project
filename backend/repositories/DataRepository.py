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
    def read_1vs1_data():
        sql = "SELECT * FROM Device"
        result = Database.get_rows(sql)
        return result

    @staticmethod
    def read_1vs1_data_by_time(time):
        sql = "SELECT * FROM Device WHERE time = %s"
        params = [time]
        result = Database.get_rows(sql, params)
        return result

    @staticmethod
    def read_speedrun_data():
        sql = "SELECT * FROM Speedrun"
        result = Database.get_rows(sql)
        return result
