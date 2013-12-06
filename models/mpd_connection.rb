class MPDConnection
  def self.mpd
    @mpd ||= MPD.new
    @mpd.connect unless @mpd.connected?
    @mpd
  end

  def self.status
    self.mpd.status
  end
end
