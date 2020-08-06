const PRODUCTS = {
  BRIE: "Aged Brie",
  SULFURAS: "Sulfuras, Hand of Ragnaros",
  BACKSTAGE_PASS: "Backstage passes to a TAFKAL80ETC concert",
  CONJURED: "Conjured Mana Cake",
};

const NON_DEGRADING = [PRODUCTS.BRIE, PRODUCTS.BACKSTAGE_PASS];

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    if (!NON_DEGRADING.includes(items[i].name)) {
      if (items[i].quality > 0) {
        if (items[i].name != PRODUCTS.SULFURAS) {
          if (items[i].name == PRODUCTS.CONJURED) {
            decreaseQuality(i);
          }
          decreaseQuality(i);
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1;
        if (items[i].name == PRODUCTS.BACKSTAGE_PASS) {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              increaseQuality(i);
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              increaseQuality(i);
            }
          }
        }
      }
    }

    if (items[i].name != PRODUCTS.SULFURAS) {
      items[i].sell_in = items[i].sell_in - 1;
    }

    if (items[i].sell_in < 0) {
      if (items[i].name != PRODUCTS.BRIE) {
        if (items[i].name != PRODUCTS.BACKSTAGE_PASS) {
          if (items[i].quality > 0) {
            if (items[i].name != PRODUCTS.SULFURAS) {
              if (items[i].name == PRODUCTS.CONJURED) {
                decreaseQuality(i);
              }
              decreaseQuality(i);
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality;
        }
      } else {
        if (items[i].quality < 50) {
          increaseQuality(i);
        }
      }
    }
  }
}

const decreaseQuality = (index) => {
  items[index].quality = items[index].quality - 1;
};

const increaseQuality = (index) => {
  items[index].quality = items[index].quality + 1;
};
