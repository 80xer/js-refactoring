const { statement, htmlStatement } = require('../src/statement');
const assert = require('assert');

describe('statement', () => {
  it('empty paramiters', () => {
    assert.throws(() => {
      const state = statement();
    });
  });

  it('for empty invoice', () => {
    const invoice = {
      performances: [],
    };
    let plays;
    const result = statement(invoice, plays);
    assert.equal(
      result,
      'Statement for undefined\n' +
        'Amount owed is $0.00\n' +
        'You earned 0 credits\n'
    );
  });

  it('should throw error for non empty invoice but type is null', () => {
    const invoice = {
      performances: [
        {
          playID: 'kim',
        },
      ],
    };
    const plays = {
      kim: {
        type: null,
      },
    };

    assert.throws(
      () => {
        const result = statement(invoice, plays);
      },
      Error,
      'Error: unknown type: null'
    );
  });

  it('tragedy play and audience is less than or equal to 30', () => {
    let invoice = {
      customer: 'Gildong',
      performances: [
        {
          playID: 'Hamlet',
          audience: 30,
        },
      ],
    };

    let plays = {
      Hamlet: {
        name: 'Hamlet',
        type: 'tragedy',
      },
    };
    const result = statement(invoice, plays);
    assert.equal(
      result,
      'Statement for Gildong\n' +
        '  Hamlet: $400.00 (30 seats)\n' +
        'Amount owed is $400.00\n' +
        'You earned 0 credits\n'
    );
  });

  it('tragedy play and audience is more than 30', () => {
    let invoice = {
      customer: 'Gildong',
      performances: [
        {
          playID: 'Hamlet',
          audience: 31,
        },
      ],
    };

    let plays = {
      Hamlet: {
        name: 'Hamlet',
        type: 'tragedy',
      },
    };
    const result = statement(invoice, plays);
    assert.equal(
      result,
      'Statement for Gildong\n' +
        '  Hamlet: $410.00 (31 seats)\n' +
        'Amount owed is $410.00\n' +
        'You earned 1 credits\n'
    );
  });

  it('comedy play and audience is less or equal to 20', async function() {
    let invoice = {
      customer: 'Gildong',
      performances: [
        {
          playID: 0,
          audience: 20,
        },
      ],
    };

    let plays = {
      0: {
        name: 'Hamlet',
        type: 'comedy',
      },
    };
    const result = statement(invoice, plays);
    assert.equal(
      result,
      'Statement for Gildong\n' +
        '  Hamlet: $360.00 (20 seats)\n' +
        'Amount owed is $360.00\n' +
        'You earned 4 credits\n'
    );
  });

  it('comedy play and audience is more than 20', async function() {
    let invoice = {
      customer: 'Gildong',
      performances: [
        {
          playID: 0,
          audience: 21,
        },
      ],
    };

    let plays = {
      0: {
        name: 'Hamlet',
        type: 'comedy',
      },
    };
    const result = statement(invoice, plays);
    assert.equal(
      result,
      'Statement for Gildong\n' +
        '  Hamlet: $468.00 (21 seats)\n' +
        'Amount owed is $468.00\n' +
        'You earned 4 credits\n'
    );
  });

  it('for sevral performances', () => {
    let invoice = {
      customer: 'Gildong',
      performances: [
        {
          playID: 0,
          audience: 30,
        },
        {
          playID: 1,
          audience: 31,
        },
        {
          playID: 2,
          audience: 30,
        },
        {
          playID: 3,
          audience: 31,
        },
      ],
    };
    let plays = {
      0: {
        name: 'Hamlet',
        type: 'tragedy',
      },
      1: {
        name: 'Othello',
        type: 'tragedy',
      },
      2: {
        name: 'as-like',
        type: 'comedy',
      },
      3: {
        name: 'as-like',
        type: 'comedy',
      },
    };
    const result = statement(invoice, plays);
    assert.equal(
      result,
      'Statement for Gildong\n' +
        '  Hamlet: $400.00 (30 seats)\n' +
        '  Othello: $410.00 (31 seats)\n' +
        '  as-like: $540.00 (30 seats)\n' +
        '  as-like: $548.00 (31 seats)\n' +
        'Amount owed is $1,898.00\n' +
        'You earned 14 credits\n'
    );
  });

  it('HTML Rendering 테스트', () => {
    let invoice = {
      customer: 'Gildong',
      performances: [
        {
          playID: 0,
          audience: 30,
        },
      ],
    };

    let plays = {
      0: {
        name: 'Hamlet',
        type: 'tragedy',
      },
    };

    let result = htmlStatement(invoice, plays);
    assert.equal(
      result,
      '<h1>Statement for Gildong</h1>\n' +
        '<table>\n' +
        '<tr><th>play</th><th>seats</th><th>cost</th></tr>  <tr><td>Hamlet</td><td>30</td><td>$400.00</td></tr>\n' +
        '</table>\n' +
        '<p>Amount owed is <em>$400.00</em></p>\n' +
        '<p>You earned <em>0</em> credits</p>\n'
    );
  });
});
