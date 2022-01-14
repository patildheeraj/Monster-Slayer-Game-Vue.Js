function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      counter: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    useSpacialMonsterAttack() {
      return this.counter % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //A draw
        this.winner = "draw";
      } else if (value <= 0) {
        //Player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //A draw
        this.winner = "draw";
      } else if (value <= 0) {
        //monster lost
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.counter++;
      const attackValue = getRandomValue(12, 5);
      this.monsterHealth = this.monsterHealth - attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(15, 8);
      this.playerHealth = this.playerHealth - attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialMonsterAttack() {
      this.counter++;
      const attackValue = getRandomValue(20, 10);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);

      this.attackPlayer();
    },
    healPlayer() {
      this.counter++;
      const healValue = getRandomValue(20, 8);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);

      this.attackPlayer();
    },
    startGame() {
      this.winner = null;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.counter = 0;
      this.logMessages = [];
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
