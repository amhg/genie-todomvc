using Test, SearchLight, Main.UserApp, Main.UserApp.Todos
using SearchLight.Validation, SearchLight.Exceptions

@testset "Todo DB test" begin
    t = Todo()

    @testset "Invalid todo is not saved" begin
        @test save(t) == false
        @test_throws(InvalidModelException{Todo}, save!(t))
    end

end;