SELECT idSpel, spelNaam, naam1, tijd, aantalPalen, moeilijkheidsgraad, score FROM spel where spelNaam = 'Simon Says' and moeilijkheidsgraad = '1' and aantalPalen = '5' 
order by score
desc