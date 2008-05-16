Screw.Unit(function() {
	describe("stubbing", function() {
		before(function() {
			foo = {bar: function(attribute){return 'hello'}, baz:'goodbye'};
		});
		
		it("should return the stubbed value of a property", function() {
			stub(foo,'baz').and_return('baz');
			expect(foo.baz).to(equal, 'baz');
		});
		
		it("should return the stubbed value of a function", function() {
			stub(foo,'bar()').and_return('bar');
			expect(foo.bar()).to(equal, 'bar');
		});
	});
	
	describe("basic mocking", function() {					
		it("allows stubbing directly on mock objects", function() {
			mockObj = mock('foo').stub('bar()').and_return('bar');
			expect(mockObj.bar()).to(equal, 'bar');
		});
		
		it("should check an exact call count", function() {
			var m = mock('foo')
			m.should_receive('bar').exactly('twice');
			m.bar();
			m.bar();
		});
		
		it("should check a minimum call count", function() {
			var m = mock('foo')
			m.should_receive('bar').at_least('once');
			m.bar();
		});
		
		it("should check a maximum call count", function() {
			var m = mock('foo')
			m.should_receive('bar').at_most(2,'times');
			m.bar();
			m.bar();
		});
		
		it("should allow return values directly from mocks",function() {
			var m = mock('foo')
			m.should_receive('bar').exactly('once').and_return('hello');
			expect(m.bar()).to(equal, 'hello');
		});
	});
	
	describe("mocking with argument conditions", function() {					
		it("should only mock the exact method signature when with_arguments is users", function() {
			mockObj = mock('foo')
			baz = {a:'a dummy obj'}
			mockObj.should_receive('foo').with_arguments('bar',baz).and_return('foobar'); 
			expect(mockObj.foo('bar',baz)).to(equal, 'foobar');
		});
		it("should return undefined if the arguments aren't matched", function() {
			mockObj = mock('foo')
			mockObj.should_receive('foo').with_arguments('bar').and_return('foobar'); 
			expect(mockObj.foo('chicken')).to(equal, undefined);
		});
		it("should allow mocking multiple method signatures with different returns", function() {
			mockObj = mock('foo')
			mockObj.should_receive('foo').with_arguments('bar').and_return('foobar'); 
			mockObj.should_receive('foo').with_arguments('mouse').and_return('cheese');
			expect(mockObj.foo('bar')).to(equal, 'foobar');
			expect(mockObj.foo('mouse')).to(equal, 'cheese');
		});
		it("should allow mocking a method signature with arguments and setting expectations", function() {
			mockObj = mock('foo')
			mockObj.should_receive('foo').with_arguments('bar').exactly('once');
			mockObj.foo('bar')
		});
	});
});