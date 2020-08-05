describe("Gilded Rose", () => {
  const BRIE = "Aged Brie";
  const SULFURAS = "Sulfuras, Hand of Ragnaros";
  const BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";

  afterEach(() => {
    items = [];
  });

  describe("basic functionality", () => {
    beforeEach(() => {
      const normalItem = new Item("normalItem", 5, 10);
      items.push(normalItem);
      update_quality();
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
    it("by 1 value for items within sell in date", () => {
      items.push(new Item(BRIE, 1, 3));
      update_quality();
      expect(items[0].quality).toEqual(4);
    });

    it("by 2 values for items sell in date", () => {
      items.push(new Item(BRIE, -1, 3));
      update_quality();
      expect(items[0].quality).toEqual(5);
    });
  });

  it("never increases the quality of an item more than 50", () => {
    items.push(new Item(BRIE, 3, 50));
    update_quality();
    expect(items[0].quality).toEqual(50);
  });

  describe("legendary items", () => {
    beforeEach(() => {
      items.push(new Item(SULFURAS, -1, 80));
      update_quality();
    });

    it("never decrease in quality", () => {
      expect(items[0].quality).toEqual(80);
    });

    it("never has to be sold", () => {
      update_quality();
      expect(items[0].sell_in).toEqual(-1);
    });
  });

  describe("Backstage passes", () => {
    const testCases = [
      {
        days: 11,
        increase: 1,
      },
      {
        days: 17,
        increase: 1,
      },
      {
        days: 10,
        increase: 2,
      },
      {
        days: 7,
        increase: 2,
      },
      {
        days: 5,
        increase: 3,
      },
      {
        days: 3,
        increase: 3,
      },
    ];

    testCases.forEach((testCase) => {
      it(`increases value by ${testCase.increase} when ${testCase.days} days old`, () => {
        items.push(new Item(BACKSTAGE_PASS, testCase.days, 0));
        update_quality();
        expect(items[0].quality).toEqual(testCase.increase);
      });
    });
  });

  it("drops quality to 0 after concert", () => {
    items.push(new Item(BACKSTAGE_PASS, 0, 5));
    update_quality();
    expect(items[0].quality).toEqual(0);
  });
});
