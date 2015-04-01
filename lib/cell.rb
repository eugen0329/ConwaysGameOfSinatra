require  "colorize"

module Lifegame
  class Cell
    attr_reader :stat

    COLOR_ORDER = %w{light_white white light_cyan cyan light_blue blue light_green
                     green light_yellow yellow light_magenta magenta light_red red}.map(&:to_sym)

    def initialize(status = 0, age = 0)
      @stat = status
      @age  = age
    end

    def to_s
      @stat == 1 ? "▪".colorize(COLOR_ORDER[@age]) : " "
    end

    def inc_age
      #@age += 1 if @age < COLOR_ORDER.count - 1
    end

    def stat=(new_stat)
      #unless @stat == new_stat
        @stat = new_stat
        @age = 0
      #end
    end
    def stat
      @stat
    end
  end
end
