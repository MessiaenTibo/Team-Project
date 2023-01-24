SELECT idSpel, spelNaam, tijd, winnaar, count(winnaar) as 'score' FROM spel where spelNaam = "1VS1" and TIME(tijd) = '00:05:00' 
group by winnaar
order by winnaar
desc





