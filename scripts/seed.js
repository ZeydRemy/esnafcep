import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mbenydtgxaogpkojnnbh.supabase.co';
const supabaseKey = 'sb_publishable_ByvDJiH3TtLekXzuIhkXxg_SSfghskE';

const supabase = createClient(supabaseUrl, supabaseKey);

const categoriesData = [
  { slug: 'cekici', title: 'Çekici & Oto Kurtarma', icon: '🚗', type: 'urgent', tags: 'cekici oto kurtarma yol yardim', districts: 'merkez kurtalan baykan' },
  { slug: 'taksi', title: 'Taksi & Özel Ulaşım', icon: '🚕', type: 'urgent', tags: 'taksi duragi ulasim binek', districts: 'merkez kurtalan' },
  { slug: 'cilingir', title: 'Çilingir & Anahtarcı', icon: '🔑', type: 'urgent', tags: 'cilingir anahtar kilit kapi', districts: 'merkez eruh sirvan' },
  { slug: 'elektrik', title: 'Elektrik Tesisat Ustası', icon: '🔌', type: 'urgent', tags: 'elektrik elektrikci aydinlatma ariza', districts: 'merkez kurtalan pervari' },
  { slug: 'tesisat', title: 'Sıhhi Tesisat & Su Tamircisi', icon: '💧', type: 'urgent', tags: 'tesisat su tesisatci', districts: 'merkez baykan' },
  { slug: 'kombi', title: 'Kombi & Klima Tamir Servisi', icon: '🔥', type: 'urgent', tags: 'kombi klima bakim tamir', districts: 'merkez' },
  { slug: 'mobilya', title: 'Mobilya & Koltuk Takımları', icon: '🪑', type: 'catalog', tags: 'mobilya koltuk masa yatak dolap', districts: 'merkez kurtalan' },
  { slug: 'telefon', title: 'Telefon Tamir & Aksesuar', icon: '📱', type: 'catalog', tags: 'telefon tamir kilif aksesuar iphone', districts: 'merkez' },
  { slug: 'emlak', title: 'Emlak & Gayrimenkul', icon: '🏠', type: 'catalog', tags: 'emlak kiralik satilik daire arsa', districts: 'merkez eruh baykan' },
  { slug: 'galeri', title: 'Oto Galeri & 2. El Araç', icon: '🚘', type: 'catalog', tags: 'galeri oto araba vasita satilik', districts: 'merkez kurtalan' },
  { slug: 'marangoz', title: 'Marangoz & Özel Mobilya', icon: '🪚', type: 'catalog', tags: 'marangoz ahsap mobilya imalat', districts: 'merkez baykan' },
  { slug: 'beyaz-esya', title: 'Beyaz Eşya & Spot', icon: '❄️', type: 'catalog', tags: 'beyaz esya spot buzdolabi camasir', districts: 'merkez kurtalan' },
  { slug: 'hali-perde', title: 'Halı & Perde Dünyası', icon: '🪟', type: 'catalog', tags: 'hali perde stor zebra', districts: 'merkez' },
  { slug: 'ceyiz', title: 'Çeyiz & Ev Tekstili', icon: '🎁', type: 'catalog', tags: 'ceyiz ev tekstili yatak ortusu', districts: 'merkez' },
  { slug: 'gelinlik', title: 'Gelinlik & Abiye Mağazaları', icon: '👗', type: 'catalog', tags: 'gelinlik abiye dugun nisan', districts: 'merkez kurtalan' },
  { slug: 'yoresel', title: 'Yöresel Ürünler & Siirt Battaniyesi', icon: '🍯', type: 'catalog', tags: 'yoresel fistik battaniye bal', districts: 'merkez eruh pervari' },
  { slug: 'nalbur', title: 'Nalbur & Yapı Market', icon: '🧱', type: 'catalog', tags: 'nalbur yapi market boya cimento', districts: 'merkez kurtalan baykan' },
  { slug: 'boya', title: 'Boya, Badana & Alçı Ustası', icon: '🖌️', type: 'catalog', tags: 'boya badana alci boyaci', districts: 'merkez' },
  { slug: 'cicekci', title: 'Çiçekçi & Hediye Mağazaları', icon: '💐', type: 'catalog', tags: 'cicekci hediye aranjman gul', districts: 'merkez' },
  { slug: 'dugun', title: 'Düğün & Nişan Organizasyonu', icon: '🎉', type: 'catalog', tags: 'dugun nisan kina organizasyon salon', districts: 'merkez' },
  { slug: 'bilgisayar', title: 'Bilgisayar & Konsol Servisi', icon: '💻', type: 'catalog', tags: 'bilgisayar pc laptop konsol ps5', districts: 'merkez' },
  { slug: 'nakliyat', title: 'Evden Eve Nakliyat', icon: '🚚', type: 'catalog', tags: 'nakliyat evden eve tasimacilik', districts: 'merkez kurtalan' },
  { slug: 'temizlik', title: 'Ev ve Ofis Temizlik', icon: '✨', type: 'catalog', tags: 'temizlik sirketi ofis ev', districts: 'merkez' },
  { slug: 'terzi', title: 'Terzi & Kıyafet Tadilatı', icon: '✂️', type: 'catalog', tags: 'terzi tadilat dikim kiyafet', districts: 'merkez' },
  { slug: 'ayakkabi', title: 'Ayakkabı & Çanta Mağazaları', icon: '👞', type: 'catalog', tags: 'ayakkabi canta bot spor', districts: 'merkez' },
  { slug: 'kuyumcu', title: 'Kuyumcu & Gümüşçü', icon: '💍', type: 'catalog', tags: 'kuyumcu altin bilezik gumus', districts: 'merkez' },
  { slug: 'saat', title: 'Saat & Optik Mağazaları', icon: '⌚', type: 'catalog', tags: 'saat optik gozluk', districts: 'merkez' },
  { slug: 'kirtasiye', title: 'Kırtasiye & Kitabevleri', icon: '📚', type: 'catalog', tags: 'kirtasiye defter kitap kalem okul', districts: 'merkez' },
  { slug: 'matbaa', title: 'Matbaa & Dijital Baskı', icon: '🖨️', type: 'catalog', tags: 'matbaa baski davetiye reklam brosur', districts: 'merkez' },
  { slug: 'reklam', title: 'Reklam & Tabela Üretimi', icon: '🪧', type: 'catalog', tags: 'reklam tabela isikli kutu harf', districts: 'merkez' },
  { slug: 'oto-yikama', title: 'Oto Yıkama & Kuaför', icon: '🧽', type: 'catalog', tags: 'oto yikama kuafor detayli temizlik', districts: 'merkez kurtalan' },
  { slug: 'oto-lastik', title: 'Oto Lastik Satış & Tamir', icon: '🛞', type: 'catalog', tags: 'oto lastik jant rot balans', districts: 'merkez baykan' },
  { slug: 'alcipan', title: 'Alçıpan & Asma Tavan', icon: '🏗️', type: 'catalog', tags: 'alcipan asma tavan dekorasyon', districts: 'merkez' },
  { slug: 'camci', title: 'Camcı & Pimapen İmalatı', icon: '🪟', type: 'catalog', tags: 'camci pimapen pvc pencere', districts: 'merkez' },
  { slug: 'gunes-enerjisi', title: 'Güneş Enerjisi Sistemleri', icon: '☀️', type: 'catalog', tags: 'gunes enerjisi isi su', districts: 'merkez eruh' },
  { slug: 'demir-dograma', title: 'Demir Doğrama & Kaynak', icon: '⛓️', type: 'catalog', tags: 'demir dograma kaynak ferforje', districts: 'merkez' },
  { slug: 'hali-yikama', title: 'Halı Yıkama Fabrikaları', icon: '🧼', type: 'catalog', tags: 'hali yikama kilim yolluk', districts: 'merkez kurtalan' },
  { slug: 'kuru-temizleme', title: 'Kuru Temizleme & Ütü Evi', icon: '👔', type: 'catalog', tags: 'kuru temizleme utu camasir', districts: 'merkez' },
  { slug: 'petshop', title: 'Petshop & Evcil Hayvan', icon: '🐾', type: 'catalog', tags: 'petshop mama yem kedi kopek', districts: 'merkez' },
  { slug: 'zuccaciye', title: 'Züccaciye & Ev Gereçleri', icon: '🍽️', type: 'catalog', tags: 'zuccaciye mutfak bardak tencere ev', districts: 'merkez baykan' }
];

async function seed() {
  console.log('Supabase Seed başlatılıyor...');
  const { data, error } = await supabase.from('categories').upsert(categoriesData, { onConflict: 'slug' });
  if (error) {
    console.error('Seed hatası (Önce Supabase SQL Editor kısmından supabase_schema.sql çalıştırmalısınız):', error.message);
  } else {
    console.log('Kategoriler Supabase veritabanına başarıyla yüklendi!');
  }
}

seed();
