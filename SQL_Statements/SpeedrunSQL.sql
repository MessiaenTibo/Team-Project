SELECT idSpel, spelNaam, naam1, TIME(tijd) AS 'score', aantalPalen, moeilijkheidsgraad FROM spel where spelNaam = "Speedrun" and moeilijkheidsgraad = '1' and aantalPalen = '5' 
order by TIME(tijd)
asc