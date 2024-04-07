INSERT INTO pets (name) VALUES ('슬라임');

INSERT INTO pets (name) VALUES ('아구몬');

INSERT INTO pets (name) VALUES ('펫3');

INSERT INTO pets (name) VALUES ('펫4');

INSERT INTO pets (name) VALUES ('펫5');

--레벨업 시간 체크 후 레벨업
UPDATE user_current_pet
SET phase = phase + 1
WHERE next_lv_time IS NOT NULL AND next_lv_time < NOW() AND user_id = 3

--레벨업 후 다음 레벨 시간 셋팅
UPDATE user_current_pet
SET next_lv_time = ?
WHERE user_id = ?

SELECT * FROM user_current_pet;