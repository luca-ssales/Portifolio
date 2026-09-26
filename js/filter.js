/**
 * Projects Filter & Search Controller
 */
class ProjectFilter {
  constructor(allProjects, onFilterChange) {
    this.allProjects = allProjects;
    this.onFilterChange = onFilterChange;
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'recent';

    this.init();
  }

  init() {
    const pillButtons = document.querySelectorAll('.pill-btn');
    pillButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        pillButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-category') || 'all';
        this.applyFilter();
      });
    });

    const searchInput = document.getElementById('searchInput');
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.applyFilter();
    });

    const sortSelect = document.getElementById('sortSelect');
    sortSelect?.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.applyFilter();
    });
  }

  applyFilter() {
    let filtered = this.allProjects.filter(p => {
      const matchCat = this.activeCategory === 'all' || p.category.toLowerCase().includes(this.activeCategory.toLowerCase());
      const matchSearch = !this.searchQuery || 
        p.title.toLowerCase().includes(this.searchQuery) ||
        p.tags.toLowerCase().includes(this.searchQuery) ||
        p.desc.toLowerCase().includes(this.searchQuery);
      return matchCat && matchSearch;
    });

    if (this.sortBy === 'likes') {
      filtered.sort((a, b) => b.likes - a.likes);
    }

    if (typeof this.onFilterChange === 'function') {
      this.onFilterChange(filtered);
    }
  }
}
