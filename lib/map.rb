require_relative "cell"

module Lifegame
  Coordinates = Struct.new(:y,:x)

  class Map
    NEIGHBORS = [ [-1, -1], [-1, 0], [-1, 1],
                  [ 0, -1],          [ 0, 1],
                  [ 1, -1], [ 1, 0], [ 1, 1] ]

    def initialize(y, x)
      @curr = []
      @next = []
      @size = Coordinates.new(y, x)
      @size.y.times do
        @curr << Array.new(@size.x) { Cell.new(0) }
      end
      @next = @curr.map { |line| line.map(&:dup) }

    end

    def randomize
      each_cell { |cell| cell.stat = rand(0..1) }
      self
    end

    def each_cell(&block)
      return to_enum(:each_cell) unless block_given?
      @curr.flatten.each(&block)
    end

    def change_gen
      @curr.each_with_index do |line, i|
        line.each_index do |j|
          neighbors_count = get_neighbors_count(i, j)
          case neighbors_count
          when 3
            @next[i][j].stat = 1
          when 2
            @next[i][j].stat = @curr[i][j].stat
          else
            @next[i][j].stat = 0
          end
        end
      end

      @curr = @next.map { |line| line.map(&:dup) }
    end

    def get_neighbors_count(y, x)
      NEIGHBORS.map do |dy,dx|
        i = (y + dy) % @size.y
        j = (x + dx) % @size.x
        @curr[i][j].stat
      end.inject(:+)
    end

    def disp
      @curr.each do |line|
        $stderr.puts line.map(&:to_s).join
      end
    end
  end
end
