describe("Gilded Rose", () => {
  describe("basic functionality", () => {
    beforeEach(() => {
      const normalItem = new Item("normalItem", 5, 10);
      items.push(normalItem);
      update_quality();
    });

    afterEach(() => {
      items = [];
    });

    it("lowers the quality of a normal item by 1", () => {
      expect(items[0].quality).toEqual(9);
    });

    it("lowers the sell in value of a normal item by 1", () => {
      expect(items[0].sell_in).toEqual(4);
    });
  });

  it("degrades the quality twice as fast after sell in date", () => {
    items.push(new Item("pastSellIn", -1, 3));
    update_quality();
    expect(items[0].quality).toEqual(1);
  });

  describe("never degrades the quality below 0", () => {
    afterEach(() => {
      items = [];
    });

    it("of an item within sell in date", () => {
      items.push(new Item("zeroQuality", 1, 0));
      update_quality();
      expect(items[0].quality).toEqual(0);
    });

    it("of an item past sell in date", () => {
      items.push(new Item("zeroQuality", -1, 0));
      update_quality();
      expect(items[0].quality).toEqual(0);
    });
  });

  describe("increases quality of certain items when they age", () => {
    afterEach(() => {
      items = [];
    });

    it("by 1 value for items within sell in date", () => {
      items.push(new Item("Aged Brie", 1, 3));
      update_quality();
      expect(items[0].quality).toEqual(4);
    });

    it("by 2 values for items sell in date", () => {
      items.push(new Item("Aged Brie", -1, 3));
      update_quality();
      expect(items[0].quality).toEqual(5);
    });
  });

  it("never increases the quality of an item more than 50", () => {
    items.push(new Item("Aged Brie", 3, 50));
    update_quality();
    expect(items[0].quality).toEqual(50);
  });

  describe("legendary items", () => {
    beforeEach(() => {
      items.push(new Item("Sulfuras, Hand of Ragnaros", -1, 49));
      update_quality();
    });

    afterEach(() => {
      items = [];
    });

    it("never decrease in quality", () => {
      expect(items[0].quality).toEqual(50);
    });

    it("never has to be sold", () => {
      update_quality();
      expect(items[0].sell_in).toEqual(-1);
    });
  });
});
